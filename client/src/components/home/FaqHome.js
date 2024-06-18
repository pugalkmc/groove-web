import { useState } from "react";

function FaqHome() {

    const [faqs, setFaqs] = useState([
        { id: 1, question: "What is Groove AI?", answer: "Groove AI is a platform for ..." },
        { id: 2, question: "How do I change my password?", answer: "To change your password, ..." },
        // Add more FAQs here
      ]);


  return (
    <>
      <div className="accordion pb-5" id="faqAccordion">
        {faqs.map(faq => (
          <div className="card" key={faq.id}>
            <div className="card-header" id={`heading${faq.id}`}>
              <h5 className="mb-0">
                <button className="btn" style={{fontSize:'large'}} type="button" data-toggle="collapse" data-target={`#collapse${faq.id}`} aria-expanded="true" aria-controls={`collapse${faq.id}`}>
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
    </>
  );
}

export default FaqHome;
