import { Publisher, OrderCreatedEvent, Subjects } from "@cyticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}