class EventSourcer {

  constructor() {
    this.value = 0; //stores current value
    this.stateChange = [0]; //tracks changes made to the value
    this.currIdx = 0; //tracks most recent changee in value
  }
/*
Adds num to this.value
*/
  add(num) {
    this.stateChange.splice(this.currIdx+1, 0, num);
    this.currIdx++;
    this.value += num;
  }
/*
Subtracts num to this.value
*/
  subtract(num) {
    this.stateChange.splice(this.currIdx+1, 0, -num);
    this.currIdx++;
    this.value -= num;
  }
/*
Rollback value to previous state unless no previous state is found
*/
  undo() {
    if(this.currIdx > 0) {
      this.value -= this.stateChange[this.currIdx];
      this.currIdx--;
    }  
  }
/*
Redo value to next state unless no next state is found
*/
  redo() {
    if(this.currIdx < this.stateChange.length-1){
      this.currIdx++;
      this.value += this.stateChange[this.currIdx];
    }
  }
/*
Rollback value to num previous states unless no previous state is found
*/
  bulk_undo(num) {
    for(let i=0; i<num && this.currIdx > 0; i++) {
      this.value -= this.stateChange[this.currIdx];
      this.currIdx--;
    }
  }
  /*
Redo value to num next states unless no next state is found
*/
  bulk_redo(num) {
    for(let i=0; i<num && this.currIdx < this.stateChange.length-1; i++){
      this.currIdx ++;
      this.value += this.stateChange[this.currIdx];
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
