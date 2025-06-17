import {useLocation} from "react-router-dom";

const EmotionChat = () => {
    const {state} = useLocation();

    return (
        <iframe
            title="Embedded Web Page"
            src={state.url}
            style={{width: '100%', height: '100%'}}
        />
    )
}

export default EmotionChat;