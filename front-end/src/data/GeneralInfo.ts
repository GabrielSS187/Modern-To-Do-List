import heroImg from "../assets/img/hero-img.png";
import heroArrowImg from "../assets/img/hero-arrow-img.png";
import image from "../assets/img/women-img.png";
import whatsappLogo from "../assets/img/whatsapp-logo.png";

import completeTodoDemonstration from "./completeTodoDemonstration.json";
import incompleteTodoDemonstration from "./incompleteTodoDemonstration.json";
import { listInfoSlides } from "./listInfoSlides";

export const infoApp = {
  scrollTop: "scroll top",
  addWhatsapp: "add whatsapp",
  whatsappLogo,
};

export const infoFolder = {
  heroImg,
  heroArrowImg,
  organize: "Organize",
  yourDailyJobs: "your daily jobs",
  theOnly: "The only way to get things done",
  goTodoList: "Go to To-do list",
};

export const infoHeaderFolder = {
  coopers: "coopers",
  login: "login",
  ariaLabel: "begin session",
};

export const infoSliderFolder = {
  goodThings: "good things",
  function: "function",
  illustrations: "illustrations",
  readMore: "read more",
  listInfoSlides,
};

export const infoFormFolder = {
  getIn: "GET IN",
  touch: "TOUCH",
  sendNow: "SEND NOW",
  ariaLabel: "button to send",
  image,
  inputName: {
    label: "Your name*",
    ariaLabel: "put your name",
    placeholder: "type your name here..."
  },
  inputEmail: {
    label: "Email*",
    ariaLabel: "put your email",
    placeholder: "example@example.com"
  },
  inputTelephone: {
    label: "Telephone*",
    ariaLabel: "put your phone",
    placeholder: "(  ) ____-____"
  },
  inputMessage: {
    label: "Message*",
    ariaLabel: "leave your message",
    placeholder: "Type what you want to say to us"
  }
};

export const infoTodoFolder = {
  addNewTodoDo: "Add new todo-do",
  dragAnd: "Drag and drop to set your main priorities, check when done and create what´s new.",
  todoList: "To-do List",
  Congratulations: "Congratulations!",
  done: "Done",
  youHave: "You have done 5 tasks",
  seeAll: "see all",
  eraseAll: "erase all",
  todo: "To-do",
  takeBreath: "Take a breath.",
  startDoing: "Start doing.",
  ariaLabel: "see all completed tasks",
  completeTodoList: completeTodoDemonstration,
  incompleteTodoList: incompleteTodoDemonstration,
};

export const infoFooterFolder = {
  needHelp: "Need help?",
  email: "coopers@coopers.pro",
  copyright: "© 2021 Gabriel and Coopers. All rights reserved."
};