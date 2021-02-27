window.require = require;
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

interface Facts {
  numList: HTMLUListElement;
  generate(): void;
  generateAll(): number[];
}

class PromiseFacts implements Facts {
  numList: HTMLUListElement;
  constructor() {
    this.numList = document.getElementById("number-list") as HTMLUListElement;
  }

  generate(): void {
    console.log("test");
    let res = axios.get("http://www.google.com/");
    console.log(res);
  }

  generateAll(): number[] {
    return [2, 3];
  }
}

const PFacts = new PromiseFacts();
PFacts.generate();

// class AsyncFacts implements Facts {
//   numList: HTMLUListElement;
//   constructor() {
//     this.numList = document.getElementById("number-list") as HTMLUListElement;
//   }

//   generate(n: number[]): number {
//     return 2;
//   }

//   generateAll(n: number[]): number[] {
//     return [2, 3];
//   }
// }

class FactsUX {
  inputEl: HTMLInputElement;
  formBtn: HTMLButtonElement;
  numList: HTMLUListElement;

  constructor() {
    this.inputEl = document.getElementById("input") as HTMLInputElement;
    this.numList = document.getElementById("number-list") as HTMLUListElement;
    this.formBtn = document.getElementById("add") as HTMLButtonElement;
    this.formBtn.addEventListener("click", this.addToUl.bind(this));
  }

  addToUl(evt: Event): void {
    const { target } = evt;
    if (target) {
      evt.preventDefault();
    }
    if (!parseFloat(this.inputEl.value)) {
      this.inputEl.value = "";
      return;
    }
    const newLi = document.createElement("li") as HTMLLIElement;
    newLi.innerText = this.inputEl.value;
    this.numList.append(newLi);
    this.inputEl.value = "";
  }
}

const UX = new FactsUX();
