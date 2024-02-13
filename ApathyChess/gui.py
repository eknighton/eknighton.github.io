#py -m pip or ur fucked
import pygame
import sys
import chess
import chess.engine


#Puzzles
puzzles = [
    {'id': 0, 'state': 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'length': 1},
    {'id': 1, 'state': '8/P7/8/8/8/8/8/k1K5 w - - 0 1', 'length': 1},
    {'id': 5, 'state': '8/5ppk/8/2Q5/8/8/8/7K w - - 0 1', 'length': 2},  # Queen checkmate puzzle
    {'id': 7, 'state': '8/8/2p5/8/2P5/8/3K4/3k4 w - - 0 1', 'length': 4},  # Pawn endgame puzzle
    {'id': 8, 'state': '4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1', 'length': 2},  # Castling puzzle
]

currentPuzzle = 0
refBoard = chess.Board(puzzles[0]['state'])
lenLeft = puzzles[0]['length']

# Initialize Pygame
pygame.init()

# Set up the display
screen_size = 600
screen = pygame.display.set_mode((screen_size, screen_size))
pygame.display.set_caption('Chess Game')

# Chess Variables
board = chess.Board(puzzles[0]['state'])
selected_square = None  # Store the first selected square
player_has_won = False
player_has_failed = False
white_no_move = False
editing = False
# Define colors
white = (255, 255, 255)
black = (0, 0, 0)
light_square = (240, 217, 181)
dark_square = (181, 136, 99)
# Chessboard configuration
num_squares = 8
square_size = screen_size // num_squares

# Unicode symbols for chess pieces, using black and white symbols
piece_symbols = {
    'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔',
    'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚'
}

def draw_chessboard():
    for row in range(num_squares):
        for col in range(num_squares):
            square_color = light_square if (row + col) % 2 == 0 else dark_square
            pygame.draw.rect(screen, square_color, (col * square_size, row * square_size, square_size, square_size))

def draw_pieces(board):
    for square in chess.SQUARES:
        piece = board.piece_at(square)
        if piece:
            symbol = piece_symbols.get(piece.symbol())
            x = (square % 8) * square_size
            y = (7 - square // 8) * square_size  # Flip the board so white is at the bottom
            draw_text(symbol, x + square_size // 2, y + square_size // 2)

def draw_text(text, x, y):
    font = pygame.font.SysFont('segoeuisymbol', 48)  # 'segoeuisymbol' supports chess symbols
    text_surface = font.render(text, True, black)
    text_rect = text_surface.get_rect(center=(x, y))
    screen.blit(text_surface, text_rect)

def display_win_state():
    # Display the "You Win" prompt
    font = pygame.font.SysFont("Arial", 36)
    text_surface = font.render("You Win! Press Space for Next Puzzle", True, (0, 255, 0))  # Green text
    text_rect = text_surface.get_rect(center=(screen_size / 2, screen_size / 2))
    screen.blit(text_surface, text_rect)
    pygame.display.flip()

def display_fail_state():
    # Display the "You Win" prompt
    font = pygame.font.SysFont("Arial", 36)
    text_surface = font.render("You Failed! Press Space to retry", True, (255, 0, 0))  # Green text
    text_rect = text_surface.get_rect(center=(screen_size / 2, screen_size / 2))
    screen.blit(text_surface, text_rect)
    pygame.display.flip()

def display_no_move():
    # Display the "You Win" prompt
    font = pygame.font.SysFont("Arial", 36)
    text_surface = font.render("You Failed! White has no valid moves. Press Space", True, (255, 0, 0))  # Green text
    text_rect = text_surface.get_rect(center=(screen_size / 2, screen_size / 2))
    screen.blit(text_surface, text_rect)
    pygame.display.flip()

def get_stockfish_move(board):
    global current_move
    try:
        current_move = getMove(board)
    except chess.engine.EngineTerminatedError as e:
       current_move = None
       print("Move: none")
    return current_move

def getMove(board):
    # Path to the Stockfish engine executable
    STOCKFISH_PATH = 'stockfish-windows-x86-64/stockfish/stockfish-windows-x86-64.exe'

    # Set up the engine
    try:
        with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
            # Get the best move for the current position
            result = engine.play(board, chess.engine.Limit(time=0.1))
            
            # Return the best move
    except Exception as e:
        return None

    return result.move 

def update_board_with_stockfish_move(board):
    global current_move
    move = get_stockfish_move(board)
    if move is not None:
        try:
            board.push(move)  # Apply the move to the board
            board.turn = chess.WHITE
        except chess.IllegalMoveError:
            current_move = None
    else:
        print("No move available or engine terminated.")


def get_square_from_mouse_pos(pos):
    x, y = pos
    col = x // square_size
    row = y // square_size
    return chess.square(col, 7-row)  # Convert to `python-chess` square

def draw_highlight_square(square):
    if square is not None:
        x = chess.square_file(square) * square_size
        y = (7 - chess.square_rank(square)) * square_size  # Keep consistent with piece drawing
        pygame.draw.rect(screen, (255, 0, 0), (x, y, square_size, square_size), 5)  # Red highlight

def move_piece_directly(board, from_square, to_square):
    # Get the piece from the 'from_square'
    piece = board.piece_at(from_square)
    
    if piece:
        # Remove the piece from 'from_square'
        board.remove_piece_at(from_square)
        
        # Set the piece on 'to_square'
        board.set_piece_at(to_square, piece)

def post_move():

    global editing

    if editing:
        return

    global player_has_won
    global refBoard
    global board
    global currentPuzzle
    global player_has_failed
    global lenLeft
    global white_no_move
    # Generate the Stockfish move for the current board state
    current_move = get_stockfish_move(board)
    print(current_move)
    
    # Generate the Stockfish move for the reference board state
    reference_move = get_stockfish_move(refBoard)
    print(reference_move)
    
    # Compare the two moves
    if current_move != None and current_move == reference_move:
        print("Move Accepted!")
        update_board_with_stockfish_move(board)
        board.turn = chess.BLACK
        update_board_with_stockfish_move(board)
        refBoard = board.copy()
        lenLeft-=1
        if lenLeft < 1:
            player_has_won = True 
            print("The moves match. Puzzle solved!")
        #True
        # Additional logic for handling puzzle completion can go here
    else:
        if current_move != None:
            update_board_with_stockfish_move(board)
            print("The moves do not match. Current move: {current_move}, Reference move: {reference_move}")
        else:
            print("No move")
            white_no_move = True
        player_has_failed = True 
        # Additional logic for handling puzzle failure can go here

def post_proceed():
    global currentPuzzle
    global board
    global puzzles
    global player_has_won
    global player_has_failed
    global refBoard
    global lenLeft
    global white_no_move
    white_no_move = False
    if player_has_failed:
        board = chess.Board(puzzles[currentPuzzle]['state'])
        lenLeft = puzzles[currentPuzzle]['length']
        refBoard = board.copy()
        player_has_failed = False
    elif player_has_won:
        print("Going to next puzzle")
        currentPuzzle+=1
        board = chess.Board(puzzles[currentPuzzle]['state'])
        lenLeft = puzzles[currentPuzzle]['length']
        refBoard = board.copy()
        player_has_won = False
    else:
        board = chess.Board(puzzles[currentPuzzle]['state'])
        lenLeft = puzzles[currentPuzzle]['length']
        refBoard = board.copy()

def restart():
    global currentPuzzle
    global board
    global puzzles
    global player_has_won
    global player_has_failed
    global refBoard
    global lenLeft
    global white_no_move
    board = chess.Board(puzzles[currentPuzzle]['state'])
    lenLeft = puzzles[currentPuzzle]['length']
    refBoard = board.copy()
    player_has_won = False
    player_has_failed = False
    white_no_move = False



# Calculate the expected move for the initial puzzle state
expected_move = get_stockfish_move(board)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.MOUSEBUTTONDOWN:
            clicked_square = get_square_from_mouse_pos(event.pos)
            if selected_square is None and board.piece_at(clicked_square) is not None:
                # Select the square if it has a piece
                selected_square = clicked_square
            elif selected_square is not None:
                # Move the piece to the new square if it's different from the selected one
                if selected_square != clicked_square and board.piece_at(clicked_square) is None:
                    move_piece_directly(board, selected_square, clicked_square)
                    print(board)
                    post_move()
                # Reset selection in any case
                selected_square = None
        elif (player_has_won or player_has_failed) and event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            post_proceed()
        elif event.type == pygame.KEYDOWN and event.key == pygame.K_r:
            restart()
        elif event.type == pygame.KEYDOWN and event.key == pygame.K_j:
            editing = not editing


    # Drawing the board and pieces
    draw_chessboard()
    draw_pieces(board)
    if white_no_move:
        display_no_move()
    elif player_has_won == True:
        display_win_state()
    elif player_has_failed == True:
        display_fail_state()


    # Highlight the selected square
    if selected_square is not None:
        draw_highlight_square(selected_square)


    pygame.display.flip()

if __name__ == '__main__':
    main()

