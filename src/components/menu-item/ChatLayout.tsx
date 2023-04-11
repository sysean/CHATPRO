import React from "react";
import { useRef, useState, RefObject, useEffect } from "react";
import "./chat-layout.css";
import { createParser } from 'eventsource-parser'
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import MarkdownView from 'react-showdown';
import { Card, Textarea, Button, Loading, Avatar } from '@nextui-org/react';

// const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY
const OPENAI_API_KEY = "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"

// 对话消息定义
export interface ChatMessage {
    id: string;
    avatar: string;
    text: string;
    timestamp: string;
}

const ChatLayout = () => {
    const [userInput, setUserInput] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUserInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setUserInput(event.target.value);
    };

    const handleUserInputSubmit = async () => {
        if (!userInput.trim()) {
            return;
        }

        setLoading(true);

        // 将用户输入的消息添加到messages
        const newUserMessage: ChatMessage = {
            id: String(messages.length),
            avatar: "https://dthezntil550i.cloudfront.net/p4/latest/p42102052243097410008650553/1280_960/12bc8bc0-2186-48fb-b432-6c011a559ec0.png",
            text: userInput,
            timestamp: new Date().toLocaleString(),
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);

        // 清空用户输入
        setUserInput("");

        try {
            const messages = [{
                role: 'system',
                content: userInput
            }]

            const initOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages,
                    temperature: 0.6,
                    stream: false,
                }),
            }

            console.log(initOptions)

            const body = await myfetch(initOptions)

            const msgs = body.choices[0].message.content || ''

            // 处理API响应，将其转换为ChatMessage格式
            const chatMessage: ChatMessage = {
                id: String(messages.length + 1),
                avatar: "https://pica.zhimg.com/v2-1877651d937bf2b9abde51ca67890d5f_720w.jpg?source=172ae18b",
                text: msgs,
                timestamp: new Date().toLocaleString(),
            };
            
            setLoading(false);
            // 更新状态以显示对话消息
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };


    const MyMarkDownView1 = ({ text }) => {
        return (
            <MarkdownView
                markdown={text}
                flavor='github'
            />
        )
    }

    return (
        <div className="maincontainer">
            <div className="chat-container">
                {messages.map((message) => (
                    <div key={message.id} className="chat-message">
                        <Avatar
                            size="lg"
                            src={message.avatar}
                            color="gradient"
                            bordered
                            zoomed
                            className="chat-avatar"
                        />
                        {/* <img src={message.avatar} alt="Avatar" className="chat-avatar" /> */}
                        <Card isHoverable variant="bordered">
                            <Card.Body>
                                <div>
                                    <MyMarkDownView1 text={message.text} />
                                    <div className="chat-timestamp">{message.timestamp}</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            {loading && <Loading type="points" />}
            <div className="mytextarea">
                <Textarea
                    placeholder="输入消息，Ctrl+Enter发送"
                    fullWidth={true}
                    css={{ height: "300px", resize: "none", boxSizing: "border-box" }}
                    value={userInput}
                    onChange={handleUserInputChange}
                    aria-label="textarea"
                    maxRows={100}
                    rows={8}
                />
                <Button size="sm" color="gradient" onPress={handleUserInputSubmit} aria-label="send" css={{position: "absolute", right: "6px", bottom: "63px" }}>发送</Button>
            </div>
        </div>
    );
};

export default ChatLayout;

const parseOpenAIStream = (rawResponse: Response) => {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    if (!rawResponse.ok) {
        return new Response(rawResponse.body, {
            status: rawResponse.status,
            statusText: rawResponse.statusText,
        })
    }

    const stream = new ReadableStream({
        async start(controller) {
            const streamParser = (event: ParsedEvent | ReconnectInterval) => {
                if (event.type === 'event') {
                    const data = event.data
                    if (data === '[DONE]') {
                        controller.close()
                        return
                    }
                    try {
                        // response = {
                        //   id: 'chatcmpl-6pULPSegWhFgi0XQ1DtgA3zTa1WR6',
                        //   object: 'chat.completion.chunk',
                        //   created: 1677729391,
                        //   model: 'gpt-3.5-turbo-0301',
                        //   choices: [
                        //     { delta: { content: '你' }, index: 0, finish_reason: null }
                        //   ],
                        // }
                        const json = JSON.parse(data)
                        const text = json.choices[0].delta?.content || ''
                        const queue = encoder.encode(text)
                        controller.enqueue(queue)
                    } catch (e) {
                        controller.error(e)
                    }
                }
            }

            const parser = createParser(streamParser)
            for await (const chunk of rawResponse.body as any)
                parser.feed(decoder.decode(chunk))
        },
    })

    return new Response(stream)
}

const myfetch = async (initOptions: any) => {
    // 这里如果不加 await ，就不会等待 fetch 的结果，直接返回了
    return await fetch(`https://api.openai.com/v1/chat/completions`, initOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        }).then(jsonData => {
            return jsonData
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error(`Request failed ${error}`)
        });
}

const myfetch2 = async (initOptions: any) => {
    return await fetch('src/assets/test.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        }).then(jsonData => {
            return jsonData
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error(`Request failed ${error}`)
        });
}

const parseResp = async (response: Response) => {
    const data = response.body
    if (!data)
        throw new Error('No data')

    const reader = data.getReader()
    const decoder = new TextDecoder('utf-8')
    let done = false
    let msgs = ''

    while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
            const char = decoder.decode(value)
            if (char === '\n')
                continue

            if (char)
                msgs += char
        }
        done = readerDone
    }

    return msgs
}
