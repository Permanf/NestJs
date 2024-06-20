import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor (private customersService: CustomersService){}
    @Get(':id')
    getCustomer(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request, 
        @Res() res: Response
    ) {
        // console.log(typeof id)
        const customers = this.customersService.findCustomerById(id);
        if (customers){
            res.send(customers)
        } else {
            res.status(400).send({message:"Customer not found!"})
        }
    }
    @Get('search/:id')
    searchCustomerById(
        @Param('id', ParseIntPipe) id: number
    ){
        const customer = this.customersService.findCustomerById(id)
        if (customer) return customer
        else throw new HttpException('customer not found!', HttpStatus.BAD_REQUEST)
    }

    @Get('')
    getAllCustomers(){
        return this.customersService.getAllCustomers()
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(
        // @Req() req: Request,
        @Body() createCustomerDto: CreateCustomerDto
    ){
        // console.log(createCustomerDto)
        this.customersService.createCustomer(createCustomerDto)
    }
}
