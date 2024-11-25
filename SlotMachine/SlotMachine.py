import tkinter as tk
from tkinter import messagebox
import random

MAX_LINES = 3
MAX_BET = 100
MIN_BET = 1

ROWS = 3
COLS = 3

symbol_count = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

symbol_value = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


def check_winnings(columns, lines, bet, values):
    winnings = 0
    winning_lines = []
    for line in range(lines):
        symbol = columns[0][line]
        for column in columns:
            if column[line] != symbol:
                break
        else:
            winnings += values[symbol] * bet
            winning_lines.append(line + 1)
    return winnings, winning_lines


def get_slot_machine_spin(rows, cols, symbols):
    all_symbols = [symbol for symbol, count in symbols.items() for _ in range(count)]
    columns = []
    for _ in range(cols):
        column = []
        current_symbols = all_symbols[:]
        for _ in range(rows):
            value = random.choice(current_symbols)
            current_symbols.remove(value)
            column.append(value)
        columns.append(column)
    return columns


def format_slot_machine(columns):
    result = ""
    for row in range(len(columns[0])):
        result += " | ".join(column[row] for column in columns) + "\n"
    return result.strip()


class SlotMachineApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Slot Machine Game")
        self.root.geometry("600x500")
        self.root.config(bg="#222831")

        self.balance = 0

        # Header
        self.header = tk.Label(root, text="🎰 Slot Machine Game 🎰", font=("Helvetica", 20, "bold"), bg="#393E46", fg="#FFD369", pady=10)
        self.header.pack(fill=tk.X)

        # Main Frame
        self.main_frame = tk.Frame(root, bg="#222831", padx=20, pady=20)
        self.main_frame.pack(expand=True)

        # Balance
        self.balance_label = tk.Label(self.main_frame, text="Current Balance: $0", font=("Helvetica", 14), bg="#222831", fg="#FFD369")
        self.balance_label.grid(row=0, column=0, columnspan=2, sticky="w", pady=5)

        # Deposit Section
        self.deposit_label = tk.Label(self.main_frame, text="Deposit Amount:", font=("Helvetica", 12), bg="#222831", fg="white")
        self.deposit_label.grid(row=1, column=0, sticky="e", pady=5)
        self.deposit_entry = tk.Entry(self.main_frame, font=("Helvetica", 12))
        self.deposit_entry.grid(row=1, column=1, pady=5)

        # Lines Section
        self.lines_label = tk.Label(self.main_frame, text=f"Number of Lines (1-{MAX_LINES}):", font=("Helvetica", 12), bg="#222831", fg="white")
        self.lines_label.grid(row=2, column=0, sticky="e", pady=5)
        self.lines_entry = tk.Entry(self.main_frame, font=("Helvetica", 12))
        self.lines_entry.grid(row=2, column=1, pady=5)

        # Bet Section
        self.bet_label = tk.Label(self.main_frame, text=f"Bet Amount (${MIN_BET}-${MAX_BET}):", font=("Helvetica", 12), bg="#222831", fg="white")
        self.bet_label.grid(row=3, column=0, sticky="e", pady=5)
        self.bet_entry = tk.Entry(self.main_frame, font=("Helvetica", 12))
        self.bet_entry.grid(row=3, column=1, pady=5)

        # Buttons
        self.deposit_button = tk.Button(self.main_frame, text="Deposit", command=self.deposit, font=("Helvetica", 12), bg="#FFD369", fg="#222831", bd=0, padx=10, pady=5)
        self.deposit_button.grid(row=4, column=0, columnspan=2, pady=10)

        self.spin_button = tk.Button(self.main_frame, text="Spin", command=self.spin, state=tk.DISABLED, font=("Helvetica", 12), bg="#FFD369", fg="#222831", bd=0, padx=10, pady=5)
        self.spin_button.grid(row=5, column=0, columnspan=2, pady=10)

        # Result Label
        self.result_label = tk.Label(root, text="", font=("Helvetica", 14), bg="#222831", fg="white", justify="center")
        self.result_label.pack(fill=tk.X, pady=20)

    def deposit(self):
        try:
            amount = int(self.deposit_entry.get())
            if amount <= 0:
                raise ValueError("Amount must be greater than 0.")
            self.balance += amount
            self.update_balance()
            self.deposit_entry.delete(0, tk.END)
            self.spin_button.config(state=tk.NORMAL)
        except ValueError as e:
            messagebox.showwarning("Invalid Input", str(e))

    def spin(self):
        try:
            lines = int(self.lines_entry.get())
            bet = int(self.bet_entry.get())
            if not (1 <= lines <= MAX_LINES):
                raise ValueError(f"Number of lines must be between 1 and {MAX_LINES}.")
            if not (MIN_BET <= bet <= MAX_BET):
                raise ValueError(f"Bet amount must be between ${MIN_BET} and ${MAX_BET}.")
            total_bet = lines * bet
            if total_bet > self.balance:
                raise ValueError(f"Insufficient balance. You need ${total_bet}, but you have ${self.balance}.")
            self.balance -= total_bet

            slots = get_slot_machine_spin(ROWS, COLS, symbol_count)
            winnings, winning_lines = check_winnings(slots, lines, bet, symbol_value)
            self.balance += winnings

            slot_result = format_slot_machine(slots)
            self.result_label.config(
                text=f"Slot Result:\n{slot_result}\n\nYou won ${winnings}!\nWinning Lines: {', '.join(map(str, winning_lines)) if winning_lines else 'None'}",
                fg="#FFD369" if winnings > 0 else "#FF4C4C"
            )
            self.update_balance()

            if self.balance <= 0:
                messagebox.showinfo("Game Over", "You have run out of money. Please deposit more to continue.")
                self.spin_button.config(state=tk.DISABLED)

        except ValueError as e:
            messagebox.showwarning("Invalid Input", str(e))

    def update_balance(self):
        self.balance_label.config(text=f"Current Balance: ${self.balance}")


# Run the app
if __name__ == "__main__":
    root = tk.Tk()
    app = SlotMachineApp(root)
    root.mainloop()
-----