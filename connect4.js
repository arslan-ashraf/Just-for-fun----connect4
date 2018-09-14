class Connect4 {

	constructor(board){
		this.rows = 6
		this.columns = 7
		this.board = board
		this.create_board()
	}

	create_board(){
		let board = $(this.board)
		for (let i = 0; i < this.rows; i++) {
			let row_to_add = $('<div>').addClass('row')
			for(let j = 0; j < this.columns; j++){
				let square_to_add = $('<div>').addClass('cell empty')
				row_to_add.append(square_to_add)
			}
			board.append(row_to_add)
		}
	}

}