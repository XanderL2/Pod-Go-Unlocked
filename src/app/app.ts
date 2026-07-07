import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/layout/header/header";
import { Footer } from "./shared/components/layout/footer/footer";
import { Icon } from "./shared/components/icons/icon/icon";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Icon],
  templateUrl: './app.html',
})
export class App {
}
