import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Icon } from '../../icons/icon/icon';
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

interface NavItem {
  id: number;
  label: string;
  icon: string;
  route: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: 1,
    label: 'Unlock Block',
    icon: '/unlock.svg',
    route: '/unlock-preset',
  },
  {
    id: 2,
    label: 'Unlocked Templates',
    icon: '/templates.svg',
    route: '/unlocked-templates',
  },
  {
    id: 3,
    label: 'Restore Block',
    icon: '/restore.svg',
    route: '/restore-block',
  },
];

@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  // Services
  private router = inject(Router);

  // Properties
  identityIconsPath = ASSET_PATHS.icons.identity;
  feedbackIconsPath = ASSET_PATHS.icons.feedback;

  menuExpanded = signal<boolean>(false);
  toggleIcon = computed(() => (this.menuExpanded() ? '/menu-up.svg' : '/menu-down.svg'));

  navItems = NAV_ITEMS;
  currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  activeNavItem = computed(() =>
    NAV_ITEMS.find((navItem) => navItem.route === this.currentUrl()),
  );

  // Methods:
  toggleExpandedMenu(): void {
    this.menuExpanded.update((prevValue) => !prevValue);
  }

  selectNavItem(selectedNavItem: NavItem): void {
    this.menuExpanded.set(false);
    this.router.navigate([selectedNavItem.route]);
  }
}
