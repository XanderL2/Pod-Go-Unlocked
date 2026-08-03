import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Icon } from "../../icons/icon/icon";
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';
import { Button } from "../../buttons/button/button";

@Component({
  selector: 'app-header',
  imports: [Icon, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

  // Properties
  identityIconsPath = ASSET_PATHS.icons.identity;
  feedbackIconsPath = ASSET_PATHS.icons.feedback;

  menuExpanded = signal<boolean>(false);  
  toggleIcon = computed(() => this.menuExpanded() ? '/menu-up.svg' : '/menu-down.svg')



  toggleExpandedMenu(): void {
    this.menuExpanded.update((prevValue) => !prevValue);
  }

}
