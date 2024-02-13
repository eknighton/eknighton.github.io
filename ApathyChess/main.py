import chess
import chess.engine

def main():
    # Path to your Stockfish executable
    STOCKFISH_PATH = 'stockfish-windows-x86-64/stockfish/stockfish-windows-x86-64.exe'

    # Initialize the chess board
    board = chess.Board()

    # Initialize the Stockfish engine
    with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine:
        # Set the board to a specific position, if needed
        # board.set_fen("your_fen_here")

        # Analyze the position and get the best move
        result = engine.play(board, chess.engine.Limit(time=1.0))

        # Print the best move and the board
        print("Best move:", result.move)
        print(board)

if __name__ == "__main__":
    main()

#Function that checks bot move for boardstate.