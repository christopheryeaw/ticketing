import { Subjects, Publisher, PaymentCreatedEvent } from '@cyticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
};