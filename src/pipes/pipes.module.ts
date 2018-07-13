import { NgModule } from '@angular/core';
import { FormatXemPipe } from './format-xem/format-xem';
import { FormatMosaicPipe } from './format-mosaic/format-mosaic';
import { FormatLevyPipe } from './format-levy/format-levy';
@NgModule({
  declarations: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe],
  imports: [],
  exports: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe],
  providers: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe]
})
export class PipesModule {}
