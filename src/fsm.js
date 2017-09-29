class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.history=[];
        this.currentIndex=0;
        this.initial=config.initial;
        this.states=config.states;
        this.currentState=this.initial;
        this.history.push(this.currentState);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.states.hasOwnProperty(String(state)))
            throw Error("State doesn't exist!");
        this.currentState=state;
        if(this.history.length-1>this.currentIndex)
            this.history.splice(this.currentIndex+1, this.history.length-1-this.currentIndex);
        this.history.push(this.currentState);
        ++this.currentIndex;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(!this.states[this.currentState].transitions.hasOwnProperty(String(event)))
            throw Error("This trigger doesn't exist!");
        if(this.history.length-1>this.currentIndex)
            this.history.splice(this.currentIndex+1, this.history.length-1-this.currentIndex);
        this.currentState = this.states[this.currentState].transitions[String(event)];
        this.history.push(this.currentState);
        ++this.currentIndex;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history=[];
        this.currentIndex=0;
        this.currentState=this.initial;
        this.history.push(this.currentState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event)
            return Object.keys(this.states);
        var states=[];
        for(var state in this.states){
            if(this.states[state].transitions.hasOwnProperty(String(event)))
                states.push(String(state));
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.currentIndex==0)
            return false;
        this.currentState=this.history[--this.currentIndex];
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.currentIndex==this.history.length-1)
            return false;
        this.currentState=this.history[++this.currentIndex];
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history=[String(this.currentState)];
        this.currentIndex=0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
