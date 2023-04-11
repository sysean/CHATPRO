
function BackTop() {
    return (
        <div>
            <button id="backtop_btn" className="gpt-back-top-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 32 32"
                ><path
                    fill="currentColor"
                    d="M16 4L6 14l1.41 1.41L15 7.83V28h2V7.83l7.59 7.58L26 14L16 4z"
                ></path></svg>
            </button>
            <button id="backbottom_btn" className="gpt-back-bottom-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 32 32"
                ><path
                    fill="currentColor"
                    d="M16 4L6 14l1.41 1.41L15 7.83V28h2V7.83l7.59 7.58L26 14L16 4z"
                ></path></svg>
            </button>
        </div>
    )
}

export default BackTop;