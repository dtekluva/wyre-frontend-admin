import './MailAlert.css'
function FailedEmail({responseMsg}) {
    return (
        <div className="App">
            <div class="container">
        <div class="wyre_logo"> <img src="/images/Group 1@2x.png" alt="" srcset="" /></div>
        <div class="emoji"><img src="/images/emoji _worried face_.png" alt="" srcset="" /></div>
        <div class="text">
            <h1>Failed Entry!</h1>
            <p className='response_message'>{responseMsg}</p>
            <div class="button_section">
                <button class="button_1">Go back</button>
                <button class="button_2">Sign in</button>
            </div>
        </div>
        
    </div>
        </div>
    )
}

export default FailedEmail;