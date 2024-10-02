//2 Define Book Model Using Interface and Enum
interface Book{
id: number,
title: string,
author:string,
genre:Gen,
publishedyear: number,
};

enum Gen{
    learning = "Learning",
    scary = "Scary",
    funny = "Funny",
    sad = "SadStory",
}
interface AvailableBook extends Book{
    availability:"available";
}

interface CheckedOutBook extends Book{
    availability:"checked out";
    dueDate?:string;
}

type BookState = AvailableBook| CheckedOutBook;
class Library<T extends BookState>{

private inventory: T[] = [];
//3 Addbook
AddBook(book: T):void{
    this.inventory.push(book);
    console.log(`${book.title} by ${book.author} has been added to inventory.`);
};
//4 ListBook
listBooks(): void {
if (this.inventory.length === 0) {
    return console.log("No books in the inventory.");
    }
  
    console.log("Listing all books in the inventory:");
    this.inventory.forEach((book) => {
      console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author},Available: ${book.availability}`);
    });
  }
//5 SearchBook 
SearchBooks<K extends keyof Book>(key: K, value: Book[K]): Book[] {
    return this.inventory.filter((book) => book[key] === value);
  }
//6 UpdateBook
UpdateBook(id: number, updates: Partial<Book>): void {
    const book = this.inventory.find((b) => b.id === id);
    
    if (!book) {
      console.log(`Book with ID ${id} not found.`);
      return;
    }
    Object.assign(book, updates);
    console.log(`Book with ID ${id} has been updated.`);
  }

//7 DeleteBook
deleteBook(id: number): void {
    const index =this.inventory.findIndex((book) => book.id === id);
    if (index !== -1) {
        this.inventory.splice(index, 1);
        console.log(`Book with ID ${id} has been deleted.`);
      } else {
        console.log(`Book with ID ${id} not found.`);
      } 
    }
//9 Checkin - Return 
CheckoutBook(id:number,dueDate:string):void{
const index = this.inventory.findIndex((bok)=>bok.id === id);
if (index!== -1 &&this.inventory[index].availability==="available"){
    const checkOutBook: CheckedOutBook ={
        ...this.inventory[index],
        availability:"checked out",
        dueDate,
    };
    this.inventory[index] = checkOutBook as T;
    console.log(`Book with ID ${id} has been checked out and is due on ${dueDate}.`);
    }else{
    console.log(`Book with ID ${id} is either not available or  not found`);
    }
}
ReturnBook(id:number):void{
    const index = this.inventory.findIndex((bok)=>bok.id === id);
    if (index!== -1 &&this.inventory[index].availability==="checked out"){
        const AVBook: AvailableBook ={
            ...this.inventory[index],
            availability:"available",
            
        };
        this.inventory[index] = AVBook as T;
        console.log(`Book with ID ${id} has been returned and is now available.`);
        }else{
        console.log(`Book with ID ${id} is either not  checked out or  not found`);
        }
    }
 
    
}

const library = new Library<BookState>();

library.AddBook({
        id: 1,
        title: "Male Your Bed",
        author: "William H. McRaven",
        genre: Gen.learning,
        publishedyear: 2017,
        availability:"available",
      });
      
library.AddBook({
        id: 2,
        title: "The Silent Patient",
        author: "Alex Michelides",
        genre: Gen.scary,
        publishedyear: 2019,
        availability:"available",
      });


// 10 Test   
library.listBooks();
library.UpdateBook(1,{title:"Male Your Bed"});
library.listBooks();
const searchResult = library.SearchBooks("author","Alex Michelides"); 
console.log("Books found by title:",searchResult); 
library.deleteBook(4);
library.listBooks();
library.CheckoutBook(1,"2024-07-14");
library.listBooks();
library.ReturnBook(1);
library.ReturnBook(2);
library.listBooks();