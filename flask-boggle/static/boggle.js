class BoggleGame {
    constructor() {
        this.input = new Set();
        this.$board = $("#html-board");
        this.score = 0;
        this.attempts = 0;
        this.timer = 3;
        this.countDown = setInterval(this.boggleTimer.bind(this), 1000);
        $("#submit-form").on("click", "#input-btn", this.checkInput.bind(this));
        $(".replay").on("click", this.resetGame.bind(this))
    }

    boggleTimer() {
        $("#timer p").text(this.timer);
        if (this.timer == 0) {
            $("#submit-form").hide();
            $(".replay").removeClass("hidden");
            this.attempts++
            this.saveGameData();
            clearInterval(this.countDown);
        } else {
            this.timer--;
        }
    }

    async saveGameData() {
        const res = await axios.post("/save_game_data", {params: {score: this.score, attempts: this.attempts}})
        document.getElementById('attempts').innerText = res.data['attempts'];
        document.getElementById('high-score').innerText = res.data['high-score'];
    }

    async resetGame(evt) {
        evt.preventDefault();
        this.timer = 3;
        this.score = 0;
        this.countDown = setInterval(this.boggleTimer.bind(this), 1000);
        $("#submit-form").show();
        $(".replay").addClass("hidden");
        const res = await axios.get("/replay");
        const board = res.data['board'];
        document.querySelector('#score p').innerText = 0;
        this.$board.html('');
        for (let row of board) {
            for (let letter of row) {
                const item = document.createElement('li');
                item.innerText = letter;
                this.$board.append(item);
            }
            ;
        }
        ;
    }


    async checkInput(evt) {
        evt.preventDefault();
        const $userInput = $("#user-input").val();
        if (!$userInput) return;
        if (this.input.has($userInput)) {
            document.getElementById("submit-form").reset();
            return $('#check-word p').text('Repeated Word');
        }
        this.input.add($userInput);
        const res = await axios.get("/check_input", {"params": {"user-input": $userInput}});
        $("#check-word > p").text(res.data['res']);
        if (res.data['res'] == "ok") {
            this.score += $userInput.length;
            $('#score > p').text(this.score);
        }
        document.getElementById("submit-form").reset();
    }

}

const Boggle = new BoggleGame();