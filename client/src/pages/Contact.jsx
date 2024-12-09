import { useState } from "react";
import { useAuth } from "../store/auth";

export const Contact = () => {
  const [contact, setContact] = useState({
    email: "",
    username: "",
    message: "",
  });

  const [userData, setUserData] = useState(true);

  const {user} = useAuth(); 

  if(userData && user){
    setContact({
      username : user.username,
      email : user.email,
      message : "",
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(contact);

    try {
      const response = fetch("http://localhost:5000/api/form/contact", {
        method : "POST",
        body : JSON.stringify(contact),
        headers : {
          "Content-Type" : "application/json",
        },
      });

      if(response.ok){
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        alert("Message Sent Successfully");
      }
      console.log(response);
    } catch (error) {
      alert("Error in sending message");
    }
  };

  return (
    <>
      <section>
        <div className="section-contact">
          <div className="container grid grid-two-cols">
            <div className="Contact-image">
              <img
                src="/public/LEGENDS.png"
                alt="Contact Form"
                width="400"
                height="400"
              />
            </div>

            <div className="Contact-form">
              <h1 className="main-heading mb-3">Contact Form</h1>

              <br />

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={contact.email}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    id="username"
                    required
                    autoComplete="off"
                    value={contact.username}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="message">message</label>
                  <br />
                  <textarea
                    type="message"
                    name="message"
                    placeholder="message"
                    id="message"
                    required
                    autoComplete="off"
                    value={contact.message}
                    onChange={handleInput}
                    rows={10}
                    cols={50}
                  ></textarea>
                </div>

                <br />

                <button type="submit" className="btn btn-submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70024.96213019946!2d75.81415579436023!3d22.71955248989213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1722269112955!5m2!1sen!2sin"
            width="100%"
            height="450"
            // style="border:0;"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
