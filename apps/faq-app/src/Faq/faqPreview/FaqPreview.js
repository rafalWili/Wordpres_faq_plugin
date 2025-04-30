import './preview.css';

const faqDefaultSetItems = [
  {
    id: '1',
    question: 'pytanie 1',
    answer: 'odpowiedz 1' 
  },
  {
    id: '2',
    question: 'pytanie 2',
    answer: 'odpowiedz 2' 
  },
];

export const FaqPreview = ({ questionTextColor, questionBGColor, items, answerBGColor, answerTextColor }) => {

    const faqItems = items || faqDefaultSetItems; 
    const faqItemsList = faqItems.map((item) => {
        
        const onClick = (e) => {
            const answerElement = e.target.closest('.faq_rwd-faq-item').querySelector('.faq_rwd-faq-answer');
            if (answerElement) {
                answerElement.classList.toggle('open');
            }
        }

        return (
            <div key={item.id} className="faq_rwd-faq-item" onClick={onClick} >
                <strong className="faq_rwd-faq-question" style={{ color: questionTextColor, backgroundColor: questionBGColor }} >{item.question}</strong>
                <div className="faq_rwd-faq-answer" style={{ color: answerTextColor, backgroundColor: answerBGColor }} >
                   <p>{item.answer}</p> 
                </div>
            </div> 
        );
    });

    return (
        <div className="faq-preview" >
            <h3>Podgląd na żywo</h3>

            <div className="faq_rwd-faq-list">

               {faqItemsList}
                
            </div>   

        </div>
    );

}