class Connect4 {

	constructor(board){
		this.rows = 6
		this.columns = 7
		this.board = board
		this.create_board()
		this.actions_on_board()
	}

	create_board(){
		let board = $(this.board)
		for (let i = 0; i < this.rows; i++) {
			let row_to_add = $('<div>').addClass('row')
			for(let j = 0; j < this.columns; j++){
				let square_to_add = $('<div>').addClass('cell empty')
											  .attr('data-row', i)
											  .attr('data-column', j)
				row_to_add.append(square_to_add)
			}
			board.append(row_to_add)
		}
	}

	actions_on_board(){

		function lowest_empty_cell(column){
			let squares = $(`.cell[data-column='${column}']`)
			console.log(squares)
			for(let i = squares.length - 1; i >= 0; i--){
				let cell = $(squares[i])
				if (cell.hasClass('empty'))
					return cell
			}
		}

		let board = $(this.board)
		board.on('mouseenter', '.cell.empty', function(){
			let column = $(this).data('column')
			console.log(column)
			let lowest_empty_square = lowest_empty_cell(column)
			lowest_empty_square.addClass('not-empty')
			
		})

		board.on('mouseleave', '.cell', function(){
			$('.cell').removeClass('not-empty')
		})
	}


}