import './MailAlert.css';
function SuccessEmail({responseMsg}) {
  return (
    <div className="App">
        <div class="container">
        <div class="wyre_logo"> <img src="/images/Group 1@2x.png" /></div>
        <div class="emoji"><img src="/images/emoji _grinning face_.png" alt="" srcset="" /></div>
        <div class="text">
            <h1>Entry Successful!</h1>
            <p className='response_message'>{responseMsg}</p>
            <div class="button_section">
                <button class="button_1">Not now</button>
                <button class="button_2">Sign in</button>
            </div>
        </div>
        
    </div>
    </div>
  );
}

export default SuccessEmail;
