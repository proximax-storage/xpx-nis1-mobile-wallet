import { NgModule } from '@angular/core';
import { FormatXemPipe } from './format-xem/format-xem';
import { FormatMosaicPipe } from './format-mosaic/format-mosaic';
import { FormatLevyPipe } from './format-levy/format-levy';
import { TimeagoPipe } from './timeago/timeago';
import { GetWalletTypePipe } from './get-wallet-type/get-wallet-type';
@NgModule({
  declarations: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe,
    TimeagoPipe,
    GetWalletTypePipe],
  imports: [],
  exports: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe,
    TimeagoPipe,
    GetWalletTypePipe],
  providers: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe]
})
export class PipesModule {}
