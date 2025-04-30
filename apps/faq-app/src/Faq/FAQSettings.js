import React, { useState, useEffect, useCallback } from 'react';
import  './css/faq.css';
import { SettingElement } from './SettingElement';
import { FaqPreview } from './faqPreview/FaqPreview';
const FAQSettingsURL = window.faqPluginSettings?.apiUrl ? window.faqPluginSettings.apiUrl : 'http://localhost/wordpress/wp-json/'



const FAQSettings = () => {
  const [questionTextColor, setQuestionTextColor] = useState('#000000');
  const [questionBGColor, setQuestionBGColor] = useState('#ffffff');
  const [answerTextColor, setAnswerTextColor] = useState('#000000');
  const [answerBGColor, setAnswerBGColor] = useState('#ffffff');


  const saveSettings =  useCallback(() => {
    const settings = {
      question_text_color: questionTextColor,
      question_background_color: questionBGColor,
      answer_text_color: answerTextColor,
      answer_background_color: answerBGColor,
    };

    fetch( FAQSettingsURL +'faq/v1/save-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.faqPluginSettings?.nonce, 
      },
      body: JSON.stringify(settings),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Ustawienia zostały zapisane!');
        }
      })
      .catch(error => {
        console.error('Błąd zapisu ustawień:', error);
      });
  },[questionTextColor, questionBGColor,answerTextColor, answerBGColor]);

  useEffect(() => {
    fetch( FAQSettingsURL +'faq/v1/get-settings')
      .then(response => response.json())
      .then(data => {
        if (data.question_text_color) setQuestionTextColor(data.question_text_color);
        if (data.question_background_color) setQuestionBGColor(data.question_background_color);
        if (data.answer_text_color) setAnswerTextColor(data.answer_text_color);
        if (data.answer_background_color) setAnswerBGColor(data.answer_background_color);
      })
      .catch(error => {
        console.error('Błąd ładowania ustawień:', error);
      });
  }, []);

  return (
    <div className="container pt-4">

      <div className="setting-row">

        <aside className="aside-settings">
          <section>
          <h4>Ustawienia Pytań</h4>
          <SettingElement name="question-text-color" type="color" value={questionTextColor} setValue={setQuestionTextColor} label="Kolor tekstu" />
          <SettingElement  test="test" name="question-text-color" type="color" value={questionBGColor} setValue={setQuestionBGColor} label="Kolor tła" />
          </section>

          <section>
            <h4>Ustawienia odpowiedzi</h4>
            <SettingElement name="answer-text-color" type="color" value={answerTextColor} setValue={setAnswerTextColor} label="Kolor tekstu" />
            <SettingElement name="answer-bg-color" type="color" value={answerBGColor} setValue={setAnswerBGColor} label="Kolor tła" />
          </section>

          <button className="saveBtn" onClick={saveSettings}>Zapisz ustawienia</button>
        </aside>

        <FaqPreview questionTextColor={questionTextColor} questionBGColor={questionBGColor} answerTextColor={answerTextColor} answerBGColor={answerBGColor} />

      </div>
    </div>
  );
};

export default FAQSettings;