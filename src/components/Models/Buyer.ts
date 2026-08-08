import { IBuyer, IBuyerModel, TPayment, TValidationErrors } from '../../types';
import { validationErrors } from '../../utils/constants';

export class Buyer implements IBuyerModel {
    protected payment: TPayment = '';
    protected email: string = '';
    protected phone: string = '';
    protected address: string = '';

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): TValidationErrors {
        const errors: TValidationErrors = {};

        if (!this.payment) {
            errors.payment = validationErrors.payment;
        }
        if (!this.email) {
            errors.email = validationErrors.email;
        }
        if (!this.phone) {
            errors.phone = validationErrors.phone;
        }
        if (!this.address) {
            errors.address = validationErrors.address;
        }

        return errors;
    }
}