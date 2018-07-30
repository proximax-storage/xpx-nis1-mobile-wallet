import { NgModule } from '@angular/core';
import { FormatXemPipe } from './format-xem/format-xem';
import { FormatMosaicPipe } from './format-mosaic/format-mosaic';
import { FormatLevyPipe } from './format-levy/format-levy';
import { TimeagoPipe } from './timeago/timeago';
import { GetWalletTypePipe } from './get-wallet-type/get-wallet-type';
import { SearchContactPipe } from './search-contact/search-contact';
@NgModule({
  declarations: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe,
    TimeagoPipe,
    GetWalletTypePipe,
    SearchContactPipe],
  imports: [],
  exports: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe,
    TimeagoPipe,
    GetWalletTypePipe,
    SearchContactPipe],
  providers: [FormatXemPipe, FormatMosaicPipe, FormatLevyPipe]
})
export class PipesModule {}
