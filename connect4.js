class Connect4 {

	constructor(board){
		this.rows = 6
		this.columns = 7
		this.board = board
		this.player = 'red'
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

		let original_this = this

		function lowest_empty_cell(column){
			let squares = $(`.cell[data-column='${column}']`)
			for(let i = squares.length - 1; i >= 0; i--){
				let cell = $(squares[i])
				if (cell.hasClass('empty'))
					return cell
			}
		}

		let board = $(this.board)
		board.on('mouseenter', '.cell.empty', function(){
			let column = $(this).data('column')
			let lowest_empty_square = lowest_empty_cell(column)
			lowest_empty_square.addClass(`next-${original_this.player}-player`)
			
		})

		board.on('mouseleave', '.cell', function(){
			$('.cell').removeClass(`next-${original_this.player}-player`)
		})

		board.on('click', '.empty', function(){
			let column = $(this).data('column')
			let lowest_empty_square = lowest_empty_cell(column)
			lowest_empty_square.removeClass(`empty next-${original_this.player}-player`)
			lowest_empty_square.addClass(original_this.player)
			lowest_empty_square.attr('data-player', original_this.player)
			let row = lowest_empty_square.data('row')
			let winner = original_this.check_winner(row, column)
			if (winner){
				alert('slfkjfs')
			}

			original_this.player = original_this.player == 'red' ? 'black' : 'red'
			$(this).trigger('mouseenter')
		})
	}

	check_winner(row, column){
		let original_this = this
		console.log('row: ' + row + ', column: ' + column)
		function get_cell(i, j){
			console.log('i: ' + i + ', j: ' + j)
			let cell = $(`.cell[data-row='${i}'][data-column='${j}']`)
			console.log('cell')
			console.log(cell)
			return cell
		}

		function check_direction(direction){		
			console.log(direction)
			let total = 0
			let i = row + direction['i']
			let j = column + direction['j']
			let next = get_cell(i, j)
			while(i >= 0 && i < original_this.rows && j >= 0 && j < original_this.columns
				  && next.data('player') == original_this.player){
				total += 1
				i += direction['i']
				j += direction['j']
				next = get_cell(i, j)
			}
			console.log('total: ' + total)
			return total
		}

		function checking_win(up, down){
			let total_score = check_direction(up) + check_direction(down) + 1
			if (total_score >= 4) return original_this.player
		}

		function check_vertically(){
			return checking_win({i: -1, j: 0}, {i: 1, j:0})
		}

		return check_vertically()
	}

}