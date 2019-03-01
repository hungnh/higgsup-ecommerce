export class UtilsService {

  isNotEmpty(str: string): any {
    return typeof str!='undefined' && str //It will check undefined, null, 0 and "" also.
  }
}
