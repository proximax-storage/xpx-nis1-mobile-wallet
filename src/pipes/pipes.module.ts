import { NgModule } from '@angular/core';
import { FormatXemPipe } from './format-xem/format-xem';
import { FormatMosaicPipe } from './format-mosaic/format-mosaic';
import { FormatLevyPipe } from './format-levy/format-levy';
import { TimeagoPipe } from './timeago/timeago';
@NgModule({
  declarations: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe,
    TimeagoPipe],
  imports: [],
  exports: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe,
    TimeagoPipe],
  providers: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe]
})
export class PipesModule {}
