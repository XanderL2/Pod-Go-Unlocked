import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Icon } from "../../icons/icon/icon";
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {

  // Properties
  identityIconsPath = ASSET_PATHS.icons.identity;
  feedbackIconsPath = ASSET_PATHS.icons.feedback;

  navItems: readonly NavItem[] = [
    { id: 'unlock-block', label: 'Unlock Block', icon: '/unlock.svg' },
    { id: 'unlocked-templates', label: 'Unlocked Templates', icon: '/templates.svg' },
    { id: 'restore-block', label: 'Restore Block', icon: '/restore.svg' },
  ];

  activeNavItem = signal<string>(this.navItems[0].id);

  menuExpanded = signal<boolean>(false);
  toggleIcon = computed(() => this.menuExpanded() ? '/menu-up.svg' : '/menu-down.svg')



  toggleExpandedMenu(): void {
    this.menuExpanded.update((prevValue) => !prevValue);
  }

  selectNavItem(id: string): void {
    this.activeNavItem.set(id);
    this.menuExpanded.set(false);
  }

}
