import './Messages.css'

type MessagesPropsType = {
    messages: string
}

export const Messages = ({ messages } : MessagesPropsType) => {

    const handleChange = (event) => {
        //setTextarea(event.target.value)
      } 

    return (
        <>
            <div className="rowcenter">
                <div><textarea rows={4} cols={70} id="answer" value={messages} onChange={handleChange}></textarea></div>
            </div>
        </>
    )
}
