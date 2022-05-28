import { Event } from '../models/Event';
import { SharedService } from '../services/shared.service';
export abstract class ShasicUtils {
  /**
   * Get events sorted (incoming - next - past)
   * @param events
   * @returns
   */
  static sortByDate(events: Event[]) {
    let yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const pastEvents = events
      .filter((obj) => obj.eventDate < yest)
      .sort((objA: any, objB: any) => objA.eventDate - objB.eventDate);
    const resultEvents = events
      .filter((obj) => obj.eventDate >= yest)
      .sort((objA: any, objB: any) => objA.eventDate - objB.eventDate)
      .concat(pastEvents);
    return resultEvents;
  }

  static formatDate(inputDate: Date) {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const date = new Date(inputDate);
    return (
      date.getDate() +
      ' de ' +
      months[date.getMonth()] +
      ' del ' +
      date.getFullYear()
    );
  }

  /**
   * Artist proper profile image
   * @param img
   * @returns
   */
  static setArtistImg(img: string) {
    return img == 'default' ? '../../assets/default-band.jpg' : img;
  }

  /**
   * User proper profile image
   * @param img
   * @returns
   */
  static setUserImg(img: string) {
    return img == 'default' ? '../../assets/default-user.png' : img;
  }

  /**
   * Wait for given miliseconds
   * @param ms
   * @returns
   */
  static delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Reduce string until chars limit and add '...'
   * @param msg
   * @param charsNum
   * @returns
   */
  static reduceString(msg: string, charsNum: number): string {
    if (msg != null && msg.length > charsNum) {
      return msg.substring(0, charsNum) + '...';
    }
    return msg;
  }
}
