// 这是一个根据输入的文字，请求AI接口，返回图片的react组件
// 左侧是输入框，右侧是图片
import { Textarea, Image, Button, Loading } from '@nextui-org/react';
import { useRef, useState } from 'react';
import './image-layout.css';

const ImageLayout = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    let userInputContent: string
    const handleUserInputChange = () => {
        userInputContent = textAreaRef?.current?.value ?? ''
    };

    const handleUserInputSubmit = async () => {
        if (!userInputContent.trim()) {
            return;
        }
        setLoading(true);

        try {
            imgRef.current!.src = await myfetch(userInputContent)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    }

    return (

        <div className="main-imagelayout">
            {/* 左右布局 */}

            {/* 左侧 */}
            <div className="main-imagelayout-left">
                <Textarea
                    label="Write your thoughts"
                    placeholder="Enter your amazing ideas."
                    ref={textAreaRef}
                    onChange={handleUserInputChange}
                />
                <Button size="sm" color="gradient" onPress={handleUserInputSubmit} aria-label="send">发送</Button>
            </div>

            {/* 右侧 */}
            <div className="main-imagelayout-right">
                <Image
                    width={800}
                    height={800}
                    src="public/logo.png"
                    alt="Default Image"
                    objectFit="cover"
                    ref={imgRef}
                />
                {loading && <Loading />}
            </div>

        </div>
    )
}

export default ImageLayout


const BASE_URL = 'https://chat-proxy-chatpro-backend-udpsvkkosi.us-west-1.fcapp.run'
const OPENAI_PROXY_URL = `${BASE_URL}/gen/img`
const myfetch = async (msg: string) => {
    // 这里如果不加 await ，就不会等待 fetch 的结果，直接返回了
    return await fetch(OPENAI_PROXY_URL, {
        method: 'POST',
        body: JSON.stringify({
            data: msg,
        }),
        headers: {
            'Content-Type': 'application/json', // 千万别忘了这个，不然很难排查
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.text();
        }).then(data => {
            return data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error(`Request failed ${error}`)
        });
}