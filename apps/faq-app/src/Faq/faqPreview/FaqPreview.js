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

const formatSpacingValues = (arr) => {
    return arr.map(value => `${value}px`).join(' ');
}

export const FaqPreview = ({ questionTextColor, questionBGColor, items, answerBGColor, answerTextColor, qPadding,
                               qMargin, aPadding, aMargin, qFontSize, aFontSize,
                                qBorder, qBorderSelected, qBorderWidth, qBorderColor,aBorderRadius, qBorderRadius,
                                aBorder,aBorderColor,  aBorderSelected, aBorderWidth }) => {

    const faqItems = items || faqDefaultSetItems;
    const qPaddingValues = qPadding ? formatSpacingValues(qPadding) : 0;
    const qMarginValues = qMargin ? formatSpacingValues(qMargin) : 0;
    const aPaddingValues =  aPadding ? formatSpacingValues(aPadding) : 0;
    const aMarginValues =  aMargin ? formatSpacingValues(aMargin) : 0 ;

    const faqItemsList = faqItems.map((item) => {
        
        const onClick = (e) => {
            const answerElement = e.target.closest('.faq_rwd-faq-item').querySelector('.faq_rwd-faq-answer');
            if (answerElement) {
                answerElement.classList.toggle('open');
            }
        }

        return (
            <div key={item.id} className="faq_rwd-faq-item" onClick={onClick}  style={{ margin: qMarginValues}} >
                <strong className="faq_rwd-faq-question"
                        style={{ color: questionTextColor,
                            backgroundColor: questionBGColor,
                            padding: qPaddingValues,
                            fontSize: `${qFontSize}px`,
                            borderTopLeftRadius: qBorderRadius[1]+'px',
                            borderTopRightRadius: qBorderRadius[2]+'px',
                            borderBottomRightRadius: qBorderRadius[0]+'px',
                            borderBottomLeftRadius: qBorderRadius[3]+'px',
                            border: qBorderSelected
                                ? undefined
                                : 'none', 
                                ...(qBorderSelected && {
                                borderTopWidth: qBorder[0] ? `${qBorderWidth}px` : '0',
                                borderRightWidth: qBorder[1] ? `${qBorderWidth}px` : '0',
                                borderBottomWidth: qBorder[2] ? `${qBorderWidth}px` : '0',
                                borderLeftWidth: qBorder[3] ? `${qBorderWidth}px` : '0',
                                borderStyle: 'solid',
                                borderColor: qBorderColor,
                                })
                        }}
                >{item.question}</strong>
                <div className="faq_rwd-faq-answer" style={{ color: answerTextColor,
                    backgroundColor: answerBGColor,
                    padding: aPaddingValues,
                    margin: aMarginValues,
                    border: aBorderSelected
                    ? undefined
                    : 'none', 
                    ...(aBorderSelected && {
                    borderTopWidth: aBorder[0] ? `${aBorderWidth}px` : '0',
                    borderRightWidth: aBorder[1] ? `${aBorderWidth}px` : '0',
                    borderBottomWidth: aBorder[2] ? `${aBorderWidth}px` : '0',
                    borderLeftWidth: aBorder[3] ? `${aBorderWidth}px` : '0',
                    borderStyle: 'solid',
                    borderColor: aBorderColor,
                    }),
                    borderTopLeftRadius: aBorderRadius[1]+'px',
                    borderTopRightRadius: aBorderRadius[2]+'px',
                    borderBottomRightRadius: aBorderRadius[0]+'px',
                    borderBottomLeftRadius: aBorderRadius[3]+'px'
                }} >
                   <p style={{  fontSize: `${aFontSize}px` }} >{item.answer}</p>
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