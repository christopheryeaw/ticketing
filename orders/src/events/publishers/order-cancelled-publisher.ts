import { Publisher, OrderCancelledEvent, Subjects } from "@cyticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}