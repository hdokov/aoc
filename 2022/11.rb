input = "Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1"

Monkey = Struct.new(*%i(name items operation test t f inspects), keyword_init: true)
monkeys2 = input.split("\n\n").map do |s| 
  name, items, operation, tst, t, f = s.split("\n")
  # p name, items, operation, tst, t, f
  Monkey.new(
    name: name.split(':').first().downcase(),
    items: items.split(': ').last().split(',').map { |n| n.to_i },
    operation: operation
      .split('new = ')
      .last(),
    test: tst.split('by ').last().to_i,
    t: t.split('to ').last(),
    f: f.split('to ').last(),
    inspects: 0
  )
end

# pp monkeys2

start = Time.now
200.times do |i|
  monkeys2.each do |m|
    old = m.items.shift
    while (old) do
      n = eval(m.operation)
      nxt = n % m.test == 0 ? m[:t] : m[:f]
      monkeys2.find { |m| m.name == nxt }.items << n
      m.inspects += 1
      old = m.items.shift
    end
  end
end
p Time.now - start

pp monkeys2.map { |m| [m.name, m.inspects] }
p monkeys2.map(&:inspects).sort[-2..-1].reduce(1) { |a, b| a * b }

