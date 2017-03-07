import { Item } from '../items/item';

//processed by the JAX-RS processOrder method 
export class OrderSubmission {
    
    protected orderItems: Item[]; //include array of items in user cart at time of order submission

    public OrderSubmission() { }

}
