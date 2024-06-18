import React, { useEffect, useState } from 'react';
import '../ConsolePage.css'

function FAQ() {
  const [faqs, setFaqs] = useState([
    { id: 1, question: "What is Groove AI?", answer: "Your ultimate AI chat assistant for group management. Seamlessly integrates with Telegram, providing smart moderation and human-like responses. Advanced features include auto-kicking, banning, and muting based on user behavior, ensuring a safe and engaging community 24/7." },
    { id: 2, question: "How do I change my password?", answer: "Password change feature will be available soon" },
    // Add more FAQs here
  ]);

//   useEffect(() => {
//     // Fetch the FAQs from the backend
//     axios.get('/api/faqs')
//       .then(response => setFaqs(response.data))
//       .catch(error => console.error("There was an error fetching the FAQs!", error));
//   }, []);

  return (
    <div className='console-page'>
      <div className="container pt-5">
      <h4>Frequently Asked Questions</h4>
      <div className="accordion" id="faqAccordion">
        {faqs.map(faq => (
          <div className="card" key={faq.id}>
            <div className="card-header" id={`heading${faq.id}`}>
              <h5 className="mb-0">
                <button className="btn faq-btn" type="button" data-toggle="collapse" data-target={`#collapse${faq.id}`} aria-expanded="true" aria-controls={`collapse${faq.id}`}>
                  {faq.question}
                </button>
              </h5>
            </div>

            <div id={`collapse${faq.id}`} className="collapse" aria-labelledby={`heading${faq.id}`} data-parent="#faqAccordion">
              <div className="card-body">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default FAQ;