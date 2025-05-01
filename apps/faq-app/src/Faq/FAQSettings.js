import React, { useState, useEffect, useCallback } from 'react';
import  './css/faq.css';
import { SettingElement } from './SettingElement';
import { FaqPreview } from './faqPreview/FaqPreview';
import  Accordion from '../components/Accordion/Accordion';
import {SpacingComponent} from "../components/SpacingComponent/SpacingComponent";
import {BorderComponent} from "../components/BorderComponent/BorderComponent";

const FAQSettingsURL = window.faqPluginSettings?.apiUrl ? window.faqPluginSettings.apiUrl : 'http://localhost/wordpress/wp-json/'

const FAQSettings = () => {
  const [questionTextColor, setQuestionTextColor] = useState('#000000');
  const [questionBGColor, setQuestionBGColor] = useState('#ffffff');
  const [qPadding, setQPadding] = useState([10,10,10,10]);
  const [qMargin, setQMargin] = useState([0,0,10,0]);
  const [qFontSize, setQFontSize] = useState(16);
  const [qBorder, setQBorder] = useState([true,true,true,true]);
  const [qBorderSelected, setQBorderSelected] = useState(true);
  const [qBorderWidth, setQBorderWidth] = useState(1);
  const [qBorderColor, setQBorderColor] = useState('#000000');
  const [qBorderRadius, setQBorderRadius] = useState([0,0,0,0]);


  const [answerTextColor, setAnswerTextColor] = useState('#000000');
  const [answerBGColor, setAnswerBGColor] = useState('#ffffff');
  const [aPadding, setAPadding] = useState([0,0,0,10]);
  const [aMargin, setAMargin] = useState([0,0,10,0]);
  const [aFontSize, setAFontSize] = useState(16);
  const [aBorder, setABorder] = useState([true,true,true,true]);
  const [aBorderSelected, setABorderSelected] = useState(true);
  const [aBorderWidth, setABorderWidth] = useState(1);
  const [aBorderColor, setABorderColor] = useState('#000000');
  const [aBorderRadius, setABorderRadius] = useState([0,0,0,0]);



  const saveSettings =  useCallback(() => {
    const settings = {
      question_text_color: questionTextColor,
      question_background_color: questionBGColor,
      question_padding : qPadding,
      question_margin : qMargin,
      question_font_size : qFontSize,
      question_border : qBorder,
      question_border_selected : qBorderSelected,
      question_border_width : qBorderWidth,
      question_border_color : qBorderColor,
      question_border_radius : qBorderRadius,
      answer_text_color: answerTextColor,
      answer_background_color: answerBGColor,
      answer_padding : aPadding,
      answer_margin : aMargin,
      answer_font_size : aFontSize,
      answer_border : aBorder,
      answer_border_selected : aBorderSelected,
      answer_border_width : aBorderWidth,
      answer_border_color : aBorderColor,
      answer_border_radius : aBorderRadius,
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
  },[questionTextColor, questionBGColor,answerTextColor, answerBGColor,
     qPadding, qMargin, aPadding, aMargin, aFontSize, qFontSize,
     qBorder, qBorderSelected, qBorderWidth, qBorderColor, qBorderRadius,
      aBorder, aBorderSelected, aBorderWidth, aBorderColor, aBorderRadius
    ]);                

  useEffect(() => {
    fetch( FAQSettingsURL +'faq/v1/get-settings')
      .then(response => response.json())
      .then(data => {
        console.log('data = ',data);
        if (data.question_text_color) setQuestionTextColor(data.question_text_color);
        if (data.question_background_color) setQuestionBGColor(data.question_background_color);
        if (data.answer_text_color) setAnswerTextColor(data.answer_text_color);
        if (data.answer_background_color) setAnswerBGColor(data.answer_background_color);
        if (data.question_padding) setQPadding(data.question_padding);
        if (data.question_margin) setQMargin(data.question_margin);
        if (data.question_font_size) setQFontSize(data.question_font_size);
        if (data.answer_padding) setAPadding(data.answer_padding);
        if (data.answer_margin) setAMargin(data.answer_margin);
        if (data.answer_font_size) setAFontSize(data.answer_font_size);
        if (data.question_border) setQBorder(data.question_border);
        if (data.question_border_selected) setQBorderSelected(data.question_border_selected);
        if (data.question_border_width) setQBorderWidth(data.question_border_width);
        if (data.question_border_color) setQBorderColor(data.question_border_color);
        if (data.question_border_radius) setQBorderRadius(data.question_border_radius);
        if (data.answer_border) setABorder(data.answer_border);
        if (data.answer_border_selected) setABorderSelected(data.answer_border_selected);
        if (data.answer_border_width) setABorderWidth(data.answer_border_width);
        if (data.answer_border_color) setABorderColor(data.answer_border_color);
        if (data.answer_border_radius) setABorderRadius(data.answer_border_radius);

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
          <SettingElement name="question-text-color" type="color" value={questionBGColor} setValue={setQuestionBGColor} label="Kolor tła" />
          <SettingElement name="question-font-size" type="number" value={qFontSize} setValue={setQFontSize} label="Rozmiar czcionki" inputSize="small" />


            <div style={{ width: '100%' }}>
            <Accordion title="Padding" > <SpacingComponent spacingType="padding" type="question" setter={setQPadding} values={qPadding} /></Accordion>
          </div>
          <div style={{ width: '100%' }}>
              <Accordion title="Margin" > <SpacingComponent spacingType="margin" type="question" setter={setQMargin} values={qMargin} /></Accordion>
          </div>
          <div style={{ width: '100%' }}>
              <Accordion title="Border" > <BorderComponent
                  type="question"
                  setter={setQBorder}
                  border={qBorder}
                  setBorderSelected={setQBorderSelected}
                  borderSelected={qBorderSelected}
                  borderWidth={qBorderWidth}
                  setBorderWidth={setQBorderWidth}
                  borderColor={qBorderColor}
                  setBorderColor={setQBorderColor}
                  borderRadius={qBorderRadius}
                  setBorderRadius={setQBorderRadius} 
              />
              </Accordion>
          </div>

          </section>

          <section>
            <h4>Ustawienia odpowiedzi</h4>
            <SettingElement name="answer-text-color" type="color" value={answerTextColor} setValue={setAnswerTextColor} label="Kolor tekstu" />
            <SettingElement name="answer-bg-color" type="color" value={answerBGColor} setValue={setAnswerBGColor} label="Kolor tła" />
            <SettingElement name="answer-font-size" type="number" value={aFontSize} setValue={setAFontSize} label="Rozmiar czcionki" inputSize="small" />

            <div style={{ width: '100%' }}>
              <Accordion title="Padding" > <SpacingComponent spacingType="padding" type="answer" setter={setAPadding} values={aPadding} /></Accordion>
            </div>
            <div style={{ width: '100%' }}>
              <Accordion title="Margin" > <SpacingComponent spacingType="margin" type="answer" setter={setAMargin} values={aMargin} /></Accordion>
            </div>
            <div style={{ width: '100%' }}>
              <Accordion title="Border" >
                 <BorderComponent
                  type="answer"
                  setter={setABorder}
                  border={aBorder}
                  setBorderSelected={setABorderSelected}
                  borderSelected={aBorderSelected}
                  borderWidth={aBorderWidth}
                  setBorderWidth={setABorderWidth}
                  borderColor={aBorderColor}
                  setBorderColor={setABorderColor}
                  borderRadius={aBorderRadius}
                  setBorderRadius={setABorderRadius} 
              />
              </Accordion>
            </div>
          </section>

          <button className="saveBtn" onClick={saveSettings}>Zapisz ustawienia</button>
        </aside>

        <FaqPreview
            questionTextColor={questionTextColor}
            questionBGColor={questionBGColor}
            answerTextColor={answerTextColor}
            answerBGColor={answerBGColor}
            qPadding={qPadding}
            qMargin={qMargin}
            aPadding={aPadding}
            aMargin={aMargin}
            qFontSize={qFontSize}
            aFontSize={aFontSize}
            qBorder={qBorder}
            qBorderSelected={qBorderSelected}
            qBorderWidth={qBorderWidth}
            qBorderColor={qBorderColor}
            qBorderRadius={qBorderRadius}
            aBorder={aBorder}
            aBorderSelected={aBorderSelected}
            aBorderWidth={aBorderWidth}
            aBorderColor={aBorderColor}
            aBorderRadius={aBorderRadius}

        />


      </div>
    </div>
  );
};

export default FAQSettings;