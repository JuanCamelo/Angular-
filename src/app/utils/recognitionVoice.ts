import { Injectable } from "@angular/core";
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecognitionVoiceService {

  constructor() { }

  listenVoice(oldText?: string) {
    try {
      var SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      // let SpeechRecognition = window.SpeechRecognition
      let recognition = new SpeechRecognition()
      recognition.lang = 'es-CO'
      recognition.continuous = true
      recognition.interimResults = true
      let timeOut

      const recognitionSubscribe = fromEvent(recognition, 'result').pipe(map(({ results }) => {
        if (timeOut) clearTimeout(timeOut);
        let txt = ''
        for (let index = 0; index < results.length; index++)
          txt += results.item(index).item(0).transcript

        timeOut = setTimeout(() => {
          recognition.stop()
          console.log('stop');
        }, 3000);
        return (oldText ? `${oldText} ` : '') + txt
      }))

      recognition.start()
      return recognitionSubscribe

    } catch (error) {
      console.log(error);
      console.log('No es compatible con reconocimiento de voz');
    }
  }

}
