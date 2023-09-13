class ProgressLogger {
  constructor(total, str_left, str_right) {
    this.str_left = ".";
    this.str_right = " ";
    if (str_left) this.str_left = str_left;
    if (str_right) this.str_right = str_right;
    this.total = total;
    this.current = 0;
    this.strtotal = 40; //progress bar width。
  }
  update(current) {
    this.current++;
    if (current) this.current = current;
    var dots = this.str_left.repeat(
      parseInt(((this.current % this.total) / this.total) * this.strtotal),
    );
    var left =
      this.strtotal -
      parseInt(((this.current % this.total) / this.total) * this.strtotal);
    var empty = this.str_right.repeat(left);
    process.stdout.write(
      `\r[${dots}${empty}] ${parseInt((this.current / this.total) * 100)}% [${
        this.total
      }-${this.current}]`,
    );
  }
}

module.exports = ProgressLogger;
