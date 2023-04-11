import Logo from './Logo'

export default () => {
    return (
        <div>
            <div className="container">
                <Logo />
                {/* <Themetoggle /> */}
            </div>
            <div className="card-panel teal lighten-2">
                <span className="bg-red h1 scale-transition">ChatGPT</span>
                <span className="gpt-subtitle">PRO</span>
            </div>
            <p mt-1 op-60>基于最强AI模型，为你解答任何问题！</p>
        </div>
    )
}
