import { Pipe, PipeTransform } from '@angular/core';
import nem from "nem-sdk";

/**
 * Generated class for the FormatImportancePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "formatImportance"
})
export class FormatImportancePipe implements PipeTransform {
  /**
   * Takes an importance score and makes it formatted importance score at 10^-4
   */
  transform(value: string, ...args) {
    const result = nem.utils.format.nemImportanceScore(value);

    console.log(result);
    console.log(result[0]);
    console.log(result[1]);

    return result;
  }
}
