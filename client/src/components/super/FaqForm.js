import React, { useState, useEffect } from 'react';

const FaqForm = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch FAQs from API on component mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  // Function to fetch FAQs from API
  const fetchFaqs = async () => {
    try {
      const response = await fetch('/api/faqs');
      if (response.ok) {
        const faqsData = await response.json();
        setFaqs(faqsData);
      } else {
        throw new Error('Failed to fetch FAQs');
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleEditClick = (faqId) => {
    const faqToEdit = faqs.find((faq) => faq.id === faqId);
    if (faqToEdit) {
      setQuestion(faqToEdit.question);
      setAnswer(faqToEdit.answer);
      setEditingId(faqId);
    }
  };

  const handleDeleteClick = async (faqId) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const response = await fetch(`/api/faqs/${faqId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchFaqs(); // Refresh FAQs after deletion
          setQuestion('');
          setAnswer('');
          setEditingId(null);
          alert('FAQ deleted successfully!');
        } else {
          throw new Error('Failed to delete FAQ');
        }
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        alert('Failed to delete FAQ. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = editingId ? `/api/faqs/${editingId}` : '/api/faqs';

    try {
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
      });

      if (response.ok) {
        fetchFaqs(); // Refresh FAQs after save
        setQuestion('');
        setAnswer('');
        setEditingId(null);
        alert(editingId ? 'FAQ updated successfully!' : 'FAQ added successfully!');
      } else {
        throw new Error('Failed to save FAQ');
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Failed to save FAQ. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mt-5 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <p className="text-sm block font-medium text-center vertical-middle">FAQ Form</p>
      <form onSubmit={handleSubmit} className="px-6 py-8">
        <div className="mb-6">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your question..."
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={handleAnswerChange}
            rows={4}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your answer..."
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingId ? 'Update FAQ' : 'Add FAQ'}
          </button>
        </div>
      </form>

      <div className="px-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All FAQs</h2>
        <ul className="divide-y divide-gray-200">
          {faqs.map((faq) => (
            <li key={faq.id} className="py-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                  <p className="text-sm text-gray-500">{faq.answer}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleEditClick(faq.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(faq.id)}
                    className="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FaqForm;
