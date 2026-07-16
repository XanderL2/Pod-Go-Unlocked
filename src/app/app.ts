import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/layout/header/header";
import { Footer } from "./shared/components/layout/footer/footer";
import { Toast } from "./shared/components/feedback/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
})
export class App {
}
