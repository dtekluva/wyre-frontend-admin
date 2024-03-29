import EnvData from '../../config/EnvData';
import './MailAlert.css';

function SuccessEmail({responseMsg, setModal}) {
  return (
    <div className="App">
      <div class="container">
        <div class="wyre_logo">
          <img src="/images/Group 1.png" alt="" srcset="" />
        </div>
        <div class="emoji">
          <img src="/images/emoji _grinning face_.png" alt="" srcset="" />
        </div>
        <div class="text">
          <h1>Entry Successful!</h1>
          <p className="response_message">{responseMsg}.</p>
          <div class="button_section">
            <button class="button_1" onClick={() => setModal(false)}>
              Not now
            </button>
            <button class="button_2">
              <a href={EnvData.REACT_APP_DASHBOARD_LINK}>Sign in</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessEmail;
