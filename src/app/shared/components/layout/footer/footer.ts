import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from "../../icons/icon/icon";
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {

  linksIconPath = ASSET_PATHS.icons.links;




}
