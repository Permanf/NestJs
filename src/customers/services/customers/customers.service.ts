import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
    private customers : Customer[] = [
        {
            id: 1,
            email: 'danny@gmail.com',
            name:"Danny 1"
            // createdAt: new Date()
        },
        {
            id: 2,
            email: 'danny2@gmail.com',
            name:"Danny 2"
            // createdAt: new Date()
        },
        {
            id: 3,
            email: 'danny3@gmail.com',
            name:"Danny 3"
            // createdAt: new Date()
        } 
    ]
    findCustomerById(id: number){
        return this.customers.find((user)=>
        user.id === id );
    }

    createCustomer(customerDto: CreateCustomerDto){
        this.customers.push(customerDto)
    }

    getAllCustomers(){
        return this.customers
    }
}
