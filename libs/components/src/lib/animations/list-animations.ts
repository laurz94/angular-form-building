import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
/** Animates the :enter and :leave for a list of elements */
export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))], { optional: true }),
    query(':leave', animate('300ms', style({ opacity: 0 })), { optional: true }),
  ]),
]);
/** Animates the :enter for a list of elements */
export const fadeInListAnimation = trigger('fadeInListAnimation', [
  transition('* <=> *', [
    query(':enter', [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))], { optional: true }),
  ]),
]);
