import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { Icon } from '../../icons/icon/icon';
import { ASSET_PATHS } from '../../../../core/constants/assets-paths';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, single, take } from 'rxjs';

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
  starterRoute = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      take(1),
    ),
  );

  activeNavItem = linkedSignal(() =>
    NAV_ITEMS.find((navId) => navId.route === this.starterRoute()),
  );

  // Methods:
  toggleExpandedMenu(): void {
    this.menuExpanded.update((prevValue) => !prevValue);
  }

  selectNavItem(selectedNavItem: NavItem): void {
    this.menuExpanded.set(false);
    this.activeNavItem.set(selectedNavItem);
    this.router.navigate([selectedNavItem.route]);
  }
}
